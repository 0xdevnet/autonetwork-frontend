import { useState, useEffect, useCallback } from 'react';
import AutoInput from '../components/AutoInput'
import { newReq } from '../utils/contract';
import { useConnector } from '../utils/connector';

export default function Home() {
  const [amount, setAmount] = useState('0');
  const [time, setTime] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [address, setAddress] = useState('');
  const [recipient, setRecipient] = useState('');

  const { active, connect, disconnect, web3, isRopsten, registryContract, senderContract } = useConnector();

  useEffect(() => {
    setShowWarning(!active);
    // @ts-ignore
    // setAddress(addresses[0]);
    if (web3) {
      web3?.eth.getAccounts().then(res => {
        setAddress(res[0]);
        if (!active) {
          setAddress('');
        }
      });
    }
    if (!active) {
      setAddress('');
    }
  }, [active, web3])


  const sendEth = useCallback(async () => {
    if (!registryContract || !senderContract || !web3) {
      setShowWarning(true);
      return;
    }
    if (!recipient || !amount) {
      return;
    }

    newReq(time, recipient, amount, registryContract, senderContract, web3);
  }, [web3, registryContract, senderContract, time, recipient, amount]);

  const setAmountValue = (val: any) => {
    setAmount(val);
  }

  const setRecipientValue = (val: any) => {
    setRecipient(val);
  }

  const setTimeValue = (val: any) => {
    setTime(val);
  }


  return (
    <div>
      <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center flex-col">
        <div className="flex justify-center items-center w-full py-2 px-3 text-white z-50 absolute top-4 right-4">
          {showWarning && <span className="px-6 py-2 ml-4 text-red-500 font-bold text-lg bg-indigo-300 rounded-lg">Please connect your wallet!</span>}
          {address && !showWarning && <span className="px-6 py-2 ml-4 text-green-700 font-bold text-lg rounded-lg">{address}</span>}
        </div>
        <div className="justify-end flex w-full py-2 px-3 text-white z-50 absolute top-4 right-4">

          {!isRopsten ? (
            <button className="px-6 py-2 ml-4 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-indigo-700 rounded-full text-white bg-indigo-600" onClick={connect}>Connect</button>
          ) : (
            <button className="px-6 py-2 ml-4 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-indigo-700 rounded-full text-white bg-indigo-600" onClick={disconnect}>Disconnect</button>
          )}
        </div>
        <div className="absolute bg-black opacity-70 inset-0 z-0"></div>
        <div className="mt-2 items-cetner" style={{ zIndex: 1 }}>
          <form className="bg-white max-w-sm mx-auto rounded-xl shadow-xl overflow-hidden p-12 space-y-4" onSubmit={(e) => { e.preventDefault() }}>
            <h2 className="text-4xl font-bold text-center text-indigo-600">Send ETH</h2>
            <AutoInput name="vlaue" placeHolder="ETH Amount" setParentValue={setAmountValue} inputType="number" />
            <AutoInput name="recipient" placeHolder="Rcipient Address" setParentValue={setRecipientValue} inputType="text" />
            <AutoInput name="time" placeHolder="Time Condition(Minuites)" setParentValue={setTimeValue} inputType="number" />
            <div className="flex items-center justify-center mt-4">
              <button onClick={sendEth} className="px-6 py-2 ml-4 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-indigo-700 rounded-full text-white bg-indigo-600 ">Send ETH</button>
            </div>
            <div className="flex flex-col items-center justify-center mt-4">
              <p className="text-xs">Powered by Autonomy Network</p>
              <p className="text-xs text-gray-400">(Extra 0.01 ETH fee included for future execution)</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
