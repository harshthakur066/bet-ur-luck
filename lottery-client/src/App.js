import React, { useState, useEffect } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

const App = () => {
  const [manager, setManager] = useState("");

  // let account0;

  // const seder = () => {
  //   web3.eth.getAccounts().then((result) => {
  //     account0 = result[0];
  //     console.log(account0);
  //     return account0;
  //   });
  // };

  const getManager = async () => {
    const manager = await lottery.methods.manager().call();
    setManager(manager);
  };

  useEffect(() => {
    getManager();
  }, []);

  console.log(manager);
  // console.log(web3.eth.accounts[0]);
  return (
    <div className="App">
      <h1>Bet Ur Luck</h1>
      <p>This contract is managed by {manager} </p>
    </div>
  );
};

// export class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { manager: "" };
//   }

//   async componentDidMount() {
//     const manager = await lottery.methods
//       .manager()
//       .call({ from: "0x74eFC0C2232D6637de57d112d9c56e4d0cdd05E2" });
//     const methods = await lottery.methods;
//     // console.log(methods.manager());
//     this.setState({ manager });
//   }
//   render() {
//     // web3.eth.getAccounts().then(console.log);
//     const { manager } = this.state;
//     console.log(manager);
//     return (
//       <div className="App">
//         <h1>Bet Ur Luck</h1>
//         <p>This contract is managed by {manager} </p>
//       </div>
//     );
//   }
// }

export default App;
