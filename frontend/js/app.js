const iniselize = async () => {
  var requestOptions = {
    method: GET,
    redirect: "follow",
  };
  const resp = await fetch("localhost:4500/create", requestOptions);
  const respJSON = await resp.json();
  console.log({ respJSON });
};
