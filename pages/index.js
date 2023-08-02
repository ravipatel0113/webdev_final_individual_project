import { useState } from "react";
export default function Home() {
  const [state, setState] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  // 0 - initial , 1 - loading, 2 - success, 2 - error
const subscribe = async (e) => {
    e.preventDefault();

    setState(1);
    setErrorMsg("");
    console.log(e.target[0].value);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: e.target[0].value,
      });

      const data = await res.json();
      if (data.error !== null) {
        throw data.error;
      }
      setState(2);
    } catch (e) {
      setErrorMsg(e);
      setState(3);
    }
  };
return (<div>
  {state == 2 ? (
     <p className="font-medium mt-4 text-xl text-green-800">
        Thanks for subscribing, you will receive mail once we launch our
 website.
     </p>
   ) : (
      <form onSubmit={subscribe} className="flex flex-col mb-9 mt-4">
         <input required placeholder="Email address" type="email" />
         <button type="submit">Subscribe</button>
         {state === 3 ? (
            <p className="text-red-500 mt-3">{errorMsg}</p>
          ) : (
                ""
              )}
         </form>
   )}
</div>);
}