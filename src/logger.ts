export const log = async (
  ...message: unknown[]
) => {
  // eslint-disable-next-line no-console
  console.log(
    new Date().toISOString(),
    ' - ',
    ...message,
  );
};

export default { log };
