
import 'express';

declare module 'express' {
  interface Request {
    filename?: string;
    width?: number;
    height?: number;
    input?: string;
    output?: string;
    
  }
}
