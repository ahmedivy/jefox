function ResetEmail({ username, link }) {
  return (
    <div>
      <h5>
        Hello {username}, please click
        <a href={link}> here </a>
        to reset your password.
      </h5>
    </div>
  );
}

export default ResetEmail;
