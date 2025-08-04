import { Header } from "../../ui-components/Header/Header";
import "./PageNotFound.css";

export const pageNotFoundText =
  "4̴̨̛͎̙0̸̤̥̊͑́4̸̞͉͈̤̈́́̓̾̔̒ | P̴̥͖̀̾͝À̴̞̠̱̫̠͓̀͊̽̍̉͠G̸̮̥̟͉͈̝̜̈̉E̷̡̺̦̫̦͔̓͜ N̷̜͓̭̩̬̻̲͋̒̏̊̑̌͆O̵͚͋̈́̀̀̔̑͗T̷̖̘͆̐ F̴̳͙͑͘͜O̶̳̩̹̗͍͑̐͐͐̂́͝ͅŪ̶͙͉͓̦̠Ń̶̼͚̈́̚D̶̛̻̯̼͌͜ | 4̵̡̡͉͖͇̓̋͗0̷̣̣̖̩̩̀͆͒̕4̸̺̯̲̥̲̹̍̌̋̽͆";

export const PageNotFound = () => {
  return (
    <>
      <Header />
      <div className="page-not-found">
        <h2>{pageNotFoundText}</h2>
        <button
          className="reload-btn"
          onClick={() => (window.location.href = "/")}
        >
          Back home
        </button>
      </div>
    </>
  );
};