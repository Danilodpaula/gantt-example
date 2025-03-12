export interface Task {
  id: string;
  name: string;
  start: Date;
  end: Date;
  type: number;
  ocurrenceType: "alarm" | "alert";
  bgColor?: string;
  borderColor?: string;
}

export interface GanttChartProps {
  tasks: Task[];
  dateStart: string;
  dateEnd: string;
  dateChange: number;
  isChecked: number;
  setIsFinished: (isFinished: boolean) => void;
  isFinished: boolean;
  loading: boolean;
}

export interface OffsetMap {
  [key: string]: number;
}
