import { NextApiHandler } from 'next';

export interface ResponseType {
  success: Boolean;
  [key: string]: any;
}

type Method = 'GET' | 'POST' | 'DELETE';

// TODO: make isPrivate option later
interface ConfigType {
  methods: Method[];
  handler: NextApiHandler;
}

export default function withHandler({
  methods,
  handler,
}: ConfigType): NextApiHandler<ResponseType> {
  return async function (req, res): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    try {
      handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  };
}
