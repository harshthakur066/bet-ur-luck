import React, { useState, useEffect } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

const App = () => {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");

  const getManager = async () => {
    const manager = await lottery.methods.manager().call();
    setManager(manager);
    const players = await lottery.methods.getPlayers().call();
    setPlayers(players);
    const balance = await web3.eth.getBalance(lottery.options.address);
    setBalance(balance);
  };

  useEffect(() => {
    getManager();
  }, []);

  console.log(manager);

  return (
    <div className="App">
      <h1>Bet Ur Luck</h1>
      <p>This contract is managed by {manager} </p>
      <p>
        There are curently {players.length} people entered, trying their luck
        for {web3.utils.fromWei(balance, "ether")} ether to win!
      </p>
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
