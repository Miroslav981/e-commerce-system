import bcrypt from 'bcrypt';

const salt = 10;

export function passwordHash(password: string): string {
  return bcrypt.hashSync(password, salt);
}

export function passwordCheck(
  password: string,
  encryptedString: string
): boolean {
  return bcrypt.compareSync(password, encryptedString);
}