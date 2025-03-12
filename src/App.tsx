import { useState } from "react";
// Escolha a importação dos eventos mockados
import { mockTasksFourTypes } from "./tasks";
import GanttChart from "./GanttChart";

function App() {
  // Configura a data inicial como o começo do dia atual (00:00)
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0); // Zerando milissegundos também

  // Configura a data final como o final do dia atual (23:59:59)
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999); // Máximo de precisão para o fim do dia

  const [dateChange, setDateChange] = useState(0);
  const [isChecked, setIsChecked] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  // Usa ISOString para o formato de data no estado
  const [dateStart, setDateStart] = useState<string>(
    startOfToday.toISOString()
  );
  const [dateEnd, setDateEnd] = useState<string>(endOfToday.toISOString());

  return (
    <div
      style={{
        width: "100%",

        height: "100%",
        background: "#f8f8f8",
        padding: "2rem",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GanttChart
          dateChange={dateChange}
          isChecked={isChecked}
          isFinished={isFinished}
          setIsFinished={setIsFinished}
          tasks={mockTasksFourTypes}
          dateStart={dateStart}
          dateEnd={dateEnd}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
