import { Hydrate as RQHydrate, HydrateProps } from "@tanstack/react-query"; 

function Hydrate(props: HydrateProps) {
  return <RQHydrate {...props} />;
}

const text = "u"

export default Hydrate;