const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      window.location.replace("/login");
    }
    return <WrappedComponent {...props} />;
    return null;
  };
};

export default withAuth;
