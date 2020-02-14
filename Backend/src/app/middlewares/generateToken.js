import phoneToken from 'generate-sms-verification-code';

export default async (req, res, next) => {
  const token = phoneToken(4, { type: 'number' });

  req.token = token;

  return next();
};
