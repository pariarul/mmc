import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { prisma } from '@/lib/prisma';

const typeDefs = `#graphql
  type Doctor {
    id: ID!
    register_no: String!
    sr_no: String!
    doctor_name: String!
    father_name: String!
    dob: String!
    qualification: String!
    address: String!
    email: String!
    date_of_issue: String!
    valid_upto: String!
    doctor_image: String
    created_at: String!
  }

  type Pagination {
    page: Int!
    limit: Int!
    total: Int!
    totalPages: Int!
  }

  type DoctorResponse {
    doctors: [Doctor!]!
    pagination: Pagination!
  }

  type Notification {
    id: ID!
    title: String!
    description: String
    created_at: String!
  }

  type Announcement {
    id: ID!
    title: String!
    file_url: String!
    created_at: String!
  }

  type Download {
    id: ID!
    title: String!
    file_url: String!
    created_at: String!
  }

  type Query {
    doctors(search: String, page: Int, limit: Int): DoctorResponse!
    doctor(id: ID!): Doctor
    notifications: [Notification!]!
    announcements: [Announcement!]!
    downloads: [Download!]!
  }

  type Mutation {
    createDoctor(
      doctor_name: String!
      father_name: String!
      dob: String!
      sr_no: String!
      qualification: String!
      register_no: String!
      address: String!
      email: String!
      date_of_issue: String!
      valid_upto: String!
      doctor_image: String
      admin_email: String!
    ): Doctor!

    createNotification(
      title: String!
      description: String
    ): Notification!
  }
`;

const resolvers = {
  Query: {
    doctors: async (_, { search = '', page = 1, limit = 10 }) => {
      const skip = (page - 1) * limit;
      const where = search
        ? {
            OR: [
              { doctor_name: { contains: search, mode: 'insensitive' } },
              { register_no: { contains: search, mode: 'insensitive' } },
              { sr_no: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {};

      try {
        // Parallelized queries for optimal performance (fast loading)
        const [doctors, total] = await Promise.all([
          prisma.doctor.findMany({
            where,
            skip,
            take: limit,
            orderBy: { created_at: 'desc' },
          }),
          prisma.doctor.count({ where }),
        ]);

        return {
          doctors: doctors.map(doc => ({
            ...doc,
            dob: doc.dob ? doc.dob.toISOString().split('T')[0] : '',
            date_of_issue: doc.date_of_issue ? doc.date_of_issue.toISOString().split('T')[0] : '',
            valid_upto: doc.valid_upto ? doc.valid_upto.toISOString().split('T')[0] : '',
            created_at: doc.created_at ? doc.created_at.toISOString() : '',
          })),
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      } catch (error) {
        console.error('Error fetching doctors via GraphQL:', error);
        throw new Error('Failed to fetch doctor database.');
      }
    },
    doctor: async (_, { id }) => {
      try {
        const doc = await prisma.doctor.findUnique({
          where: { id },
        });
        if (!doc) return null;
        return {
          ...doc,
          dob: doc.dob ? doc.dob.toISOString().split('T')[0] : '',
          date_of_issue: doc.date_of_issue ? doc.date_of_issue.toISOString().split('T')[0] : '',
          valid_upto: doc.valid_upto ? doc.valid_upto.toISOString().split('T')[0] : '',
          created_at: doc.created_at ? doc.created_at.toISOString() : '',
        };
      } catch (error) {
        console.error(`Error fetching doctor with ID ${id} via GraphQL:`, error);
        throw new Error('Failed to fetch doctor profile.');
      }
    },
    notifications: async () => {
      try {
        const list = await prisma.notification.findMany({
          orderBy: { created_at: 'desc' },
        });
        return list.map(item => ({
          ...item,
          created_at: item.created_at ? item.created_at.toISOString() : '',
        }));
      } catch (error) {
        console.error('Error fetching notifications via GraphQL:', error);
        throw new Error('Failed to fetch notifications.');
      }
    },
    announcements: async () => {
      try {
        const list = await prisma.announcement.findMany({
          orderBy: { created_at: 'desc' },
        });
        return list.map(item => ({
          ...item,
          created_at: item.created_at ? item.created_at.toISOString() : '',
        }));
      } catch (error) {
        console.error('Error fetching announcements via GraphQL:', error);
        throw new Error('Failed to fetch announcements.');
      }
    },
    downloads: async () => {
      try {
        const list = await prisma.download.findMany({
          orderBy: { created_at: 'desc' },
        });
        return list.map(item => ({
          ...item,
          created_at: item.created_at ? item.created_at.toISOString() : '',
        }));
      } catch (error) {
        console.error('Error fetching downloads via GraphQL:', error);
        throw new Error('Failed to fetch downloads.');
      }
    },
  },
  Mutation: {
    createDoctor: async (_, args) => {
      const { admin_email, ...doctorData } = args;

      // Executing database operations in an atomic transaction block
      return prisma.$transaction(async (tx) => {
        // 1. Check uniqueness of registration number within transaction
        const existingReg = await tx.doctor.findUnique({
          where: { register_no: doctorData.register_no },
        });
        if (existingReg) {
          throw new Error('A doctor with this Registration Number already exists.');
        }

        // 2. Create the Doctor profile
        const doctor = await tx.doctor.create({
          data: {
            ...doctorData,
            dob: new Date(doctorData.dob),
            date_of_issue: new Date(doctorData.date_of_issue),
            valid_upto: new Date(doctorData.valid_upto),
            doctor_image: doctorData.doctor_image || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&h=300&q=80',
          },
        });

        // 3. Log the action in the Activity Logs (ensures complete accountability)
        await tx.activityLog.create({
          data: {
            action_details: `Created doctor profile via GraphQL Mutation: ${doctor.doctor_name} (${doctor.register_no})`,
            admin_email: admin_email,
          },
        });

        return {
          ...doctor,
          dob: doctor.dob ? doctor.dob.toISOString().split('T')[0] : '',
          date_of_issue: doctor.date_of_issue ? doctor.date_of_issue.toISOString().split('T')[0] : '',
          valid_upto: doctor.valid_upto ? doctor.valid_upto.toISOString().split('T')[0] : '',
          created_at: doctor.created_at ? doctor.created_at.toISOString() : '',
        };
      });
    },
    createNotification: async (_, { title, description }) => {
      try {
        const item = await prisma.notification.create({
          data: {
            title,
            description,
          },
        });
        return {
          ...item,
          created_at: item.created_at ? item.created_at.toISOString() : '',
        };
      } catch (error) {
        console.error('Error creating notification via GraphQL:', error);
        throw new Error('Failed to create notification.');
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({ req, res }),
});

export { handler as GET, handler as POST };
