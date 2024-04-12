import jwt from 'jsonwebtoken'

export function generateAuthToken(
  id: string,
  role: string,
  names: string
): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('SECRET_KEY environment variable not set')
  }

  const secretKey = process.env.JWT_SECRET as string

  return jwt.sign({ id, role, names }, secretKey, { expiresIn: '3d' })
}
