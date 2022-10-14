import React, { useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = React.useState(0);
  const isFizz = count % 3 === 0;
  const isBuzz = count % 5 === 0;

  const increment = () => {
    setCount((prev) => ++prev);
  };

  const decrement = () => {
    setCount((prev) => --prev);
  };

  const double = useCallback(() => {
    setCount((prev) => prev + 2);
  }, []);

  const [text, setText] = React.useState("");
  const [items, setItems] = React.useState<string[]>([]);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onClickButton = () => {
    setItems((prev) => [...prev, text]);
    setText("");
  };
  const numberOfCharacters1 = () => {
    console.log("1");
    return items.reduce((sub, items) => sub + items.length, 0);
  };
  const numberOfCharacters2 = React.useMemo(() => {
    console.log("2");
    return items.reduce((sub, items) => sub + items.length, 0);
  }, [items]);

  return (
    <div className="App">
      <p>UseMemoSample</p>
      <input value={text} onChange={onChangeInput} type="text" />
      <button onClick={onClickButton} type="button">
        Add
      </button>
      {items.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      <p>total number of Character 1 : {numberOfCharacters1()}</p>
      <p>total number of Character 2 : {numberOfCharacters2}</p>
      {/* <button onClick={() => setCount((prev) => ++prev)} type="button">
        +1
      </button>
      <Fizz isFizz={isFizz} />
      <Buzz isBuzz={isBuzz} /> */}
      {/* <div>count:{count}</div>
      <DecrementButton onClick={decrement} />
      <IncrementButton onClick={increment} />
      <DoubleButton onClick={double} /> */}
    </div>
  );
}

type FizzProps = {
  isFizz: boolean;
};

const Fizz: React.FC<FizzProps> = ({ isFizz }) => {
  console.log(`Fizz が描画されました isFizz=${isFizz}`);
  if (!isFizz) return null;
  return <span>{isFizz && "fizz"}</span>;
};

type BuzzProps = {
  isBuzz: boolean;
};

const Buzz = React.memo<BuzzProps>(({ isBuzz }) => {
  console.log(`Buzzが再描画されました、 isBuzz=${isBuzz}`);
  if (!isBuzz) return null;
  return <span>{isBuzz && "Buzz"}</span>;
});

type ButtonProps = {
  onClick: () => void;
};

const DecrementButton: React.FC<ButtonProps> = ({ onClick }) => {
  console.log("DecrementButtonが再描画されました");
  return (
    <button onClick={onClick} type="button">
      Decrement
    </button>
  );
};

const IncrementButton = React.memo<ButtonProps>(({ onClick }) => {
  console.log("IncrementButtonが再描画されました");
  return (
    <button onClick={onClick} type="button">
      Increment
    </button>
  );
});

const DoubleButton = React.memo<ButtonProps>(({ onClick }) => {
  console.log("DoubleButtonが再描画されました");
  return (
    <button onClick={onClick} type="button">
      double
    </button>
  );
});

export default App;
