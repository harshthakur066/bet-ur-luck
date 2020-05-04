import React, { useState, useEffect } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

const App = () => {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

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

  const onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction to succes...");

    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(value),
      });

      setMessage("Transaction completed, you have been entered!");
    } catch (err) {
      setMessage("Transaction failed, sorry try again.");
    }
  };

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage("Hold on.....");

    try {
      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });

      setMessage("A winner has been picked!");
    } catch (err) {
      setMessage("There was some issue, please try again.");
    }
  };

  // console.log(manager);

  return (
    <div className="App">
      <h1>Bet Ur Luck</h1>
      <p>This contract is managed by {manager} </p>
      <p>
        There are curently {players.length} people entered, trying their luck
        for {web3.utils.fromWei(balance, "ether")} ether to win!
      </p>
      <hr style={{ marginLeft: 300, marginRight: 300 }} />
      <br />
      <form onSubmit={onSubmit}>
        <h3>Wanna try your luck?</h3>
        <div style={{ paddingBottom: 20 }}>
          <label>Amount of ether to enter &nbsp; </label>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>
      <hr
        style={{
          marginLeft: 300,
          marginRight: 300,
          marginTop: 40,
          marginBottom: 40,
        }}
      />

      <h3>Ready to pick a winner?</h3>
      <button onClick={onClick}>Pick a Winner</button>
      <hr
        style={{
          marginLeft: 300,
          marginRight: 300,
          marginTop: 40,
          marginBottom: 40,
        }}
      />

      <h2>{message}</h2>
    </div>
  );
};

export default App;
