import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { satelliteOperatorValidationSchema } from 'validationSchema/satellite-operators';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.satellite_operator
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSatelliteOperatorById();
    case 'PUT':
      return updateSatelliteOperatorById();
    case 'DELETE':
      return deleteSatelliteOperatorById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSatelliteOperatorById() {
    const data = await prisma.satellite_operator.findFirst(convertQueryToPrismaUtil(req.query, 'satellite_operator'));
    return res.status(200).json(data);
  }

  async function updateSatelliteOperatorById() {
    await satelliteOperatorValidationSchema.validate(req.body);
    const data = await prisma.satellite_operator.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteSatelliteOperatorById() {
    const data = await prisma.satellite_operator.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
