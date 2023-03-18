interface IError {
    error: string;
}

function InlineError({ error }: IError) {
  return <p className="my-1 text-sm text-red-600 font-medium">{error}</p>;
}

export default InlineError;
