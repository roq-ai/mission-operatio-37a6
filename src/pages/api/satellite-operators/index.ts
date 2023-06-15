import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { satelliteOperatorValidationSchema } from 'validationSchema/satellite-operators';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSatelliteOperators();
    case 'POST':
      return createSatelliteOperator();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSatelliteOperators() {
    const data = await prisma.satellite_operator
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'satellite_operator'));
    return res.status(200).json(data);
  }

  async function createSatelliteOperator() {
    await satelliteOperatorValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.customer_request?.length > 0) {
      const create_customer_request = body.customer_request;
      body.customer_request = {
        create: create_customer_request,
      };
    } else {
      delete body.customer_request;
    }
    if (body?.operation_plan?.length > 0) {
      const create_operation_plan = body.operation_plan;
      body.operation_plan = {
        create: create_operation_plan,
      };
    } else {
      delete body.operation_plan;
    }
    if (body?.satellite_data?.length > 0) {
      const create_satellite_data = body.satellite_data;
      body.satellite_data = {
        create: create_satellite_data,
      };
    } else {
      delete body.satellite_data;
    }
    const data = await prisma.satellite_operator.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
