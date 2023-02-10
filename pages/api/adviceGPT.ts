import { adviceGpt } from '@/server/controllers/adviceGpt.controller';
import { NextApiHandler } from '@/server/middelwares/NextApiHandler';

// export const config = {
//   runtime: "edge",
// };

export default NextApiHandler({
  // on post method
  post: adviceGpt
})
