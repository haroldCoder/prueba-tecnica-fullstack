import { auth, Session } from "@/common/auth";
import { NextApiRequest, NextApiResponse } from "next";

export type ProtectedHandler = (
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
) => Promise<void | NextApiResponse>;

export const protectedHandler = (handler: ProtectedHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const headers = new Headers();
        Object.entries(req.headers).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => headers.append(key, v));
            } else if (value) {
                headers.set(key, value);
            }
        });

        const session = await auth.api.getSession({ headers });

        if (!session) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        return handler(req, res, session);
    };
};
