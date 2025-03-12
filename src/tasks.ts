import { Task } from "./GanttChart/models/types";

/**
 * Gera uma data "hoje" no horário 00:00.
 * Em seguida, define hora/minuto aleatórios entre 0 e 23h59.
 */
const randomTimeInDay = (): Date => {
  const now = new Date();
  // Ajusta para hoje 00h00
  now.setHours(0, 0, 0, 0);

  const randomHour = Math.floor(Math.random() * 24);
  const randomMinute = Math.floor(Math.random() * 60);

  const randomDate = new Date(now.getTime());
  randomDate.setHours(randomHour, randomMinute, 0, 0);

  return randomDate;
};

/**
 * Adiciona 'minutes' minutos a um Date, retornando um novo objeto Date.
 * Garante que o resultado não ultrapasse 23:59 do mesmo dia.
 */
const addMinutes = (date: Date, minutes: number): Date => {
  const result = new Date(date.getTime() + minutes * 60_000);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  if (result > endOfDay) {
    return endOfDay;
  }

  return result;
};

/**
 * Verifica se dois intervalos de tempo se sobrepõem.
 */
const isOverlapping = (
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date
): boolean => {
  return startA < endB && startB < endA;
};

/**
 * Cria uma única Task aleatória com o type e name informados.
 * Garante que o evento termina no mesmo dia e não ultrapassa 23:59.
 */
const createRandomTask = (
  type: number,
  name: string,
  bgColor: string,
  borderColor: string,
  index: number,
  durationRange: [number, number] = [20, 120]
): Task => {
  const start = randomTimeInDay();

  // Cálculo de minutos restantes no dia a partir do start
  const endOfDay = new Date(start);
  endOfDay.setHours(23, 59, 59, 999);
  const minutesRemaining =
    Math.floor((endOfDay.getTime() - start.getTime()) / 60_000);

  // Define a duração aleatória respeitando o tempo restante do dia
  const maxDuration = Math.min(durationRange[1], minutesRemaining);
  const minDuration = Math.min(durationRange[0], maxDuration);

  if (minDuration === 0 || maxDuration === 0) {
    // Se não há tempo restante suficiente, força um evento "pontual" de 1 minuto
    return {
      id: `evt-${type}-${index}`,
      name,
      start,
      end: addMinutes(start, 1),
      type,
      bgColor,
      borderColor,
      ocurrenceType: Math.random() < 0.5 ? "alarm" : "alert",
    };
  }

  const randomDuration =
    Math.floor(Math.random() * (maxDuration - minDuration + 1)) +
    minDuration;

  const end = addMinutes(start, randomDuration);

  const ocurrenceType: "alarm" | "alert" =
    Math.random() < 0.5 ? "alarm" : "alert";

  return {
    id: `evt-${type}-${index}`,
    name,
    start,
    end,
    type,
    bgColor,
    borderColor,
    ocurrenceType,
  };
};

/**
 * Gera uma lista de tarefas sem sobreposição de tempo.
 * @param type Número do tipo da tarefa
 * @param name Nome da tarefa
 * @param bgColor Cor de fundo
 * @param borderColor Cor da borda
 * @param count Quantidade de tarefas a gerar
 * @param durationRange Intervalo de duração em minutos [min, max]
 */
const createNonOverlappingTasks = (
  type: number,
  name: string,
  bgColor: string,
  borderColor: string,
  count: number,
  durationRange: [number, number] = [20, 120]
): Task[] => {
  const tasks: Task[] = [];

  for (let i = 0; i < count; i++) {
    let newTask: Task;
    let tries = 0;
    const maxTries = 100;

    do {
      newTask = createRandomTask(
        type,
        name,
        bgColor,
        borderColor,
        i + 1,
        durationRange
      );

      tries++;
      if (tries > maxTries) {
        console.warn(
          `Máximo de tentativas atingido ao gerar tarefa ${i + 1} para o tipo ${type}`
        );
        break;
      }

      // Verifica sobreposição com as tasks já existentes
    } while (
      tasks.some((task) =>
        isOverlapping(newTask.start, newTask.end, task.start, task.end)
      )
    );

    tasks.push(newTask);
  }

  return tasks;
};

/**
 * EXEMPLO 1: 2 TIPOS
 *   - type=1 => "Ataques"
 *   - type=2 => "Concentração de fumaça"
 */
export const mockTasksTwoTypes: Task[] = [
  ...createNonOverlappingTasks(1, "Ataques", "FFF0F0", "ED695E", 6),
  ...createNonOverlappingTasks(
    2,
    "Concentração de fumaça",
    "E1F4FF",
    "274488",
    6
  ),
];

/**
 * EXEMPLO 2: 3 TIPOS
 *   - type=1 => "Ataques"
 *   - type=2 => "Concentração de fumaça"
 *   - type=3 => "Temperatura"
 */
export const mockTasksThreeTypes: Task[] = [
  ...createNonOverlappingTasks(1, "Ataques", "FFF0F0", "ED695E", 6),
  ...createNonOverlappingTasks(
    2,
    "Concentração de fumaça",
    "E1F4FF",
    "274488",
    6
  ),
  ...createNonOverlappingTasks(3, "Temperatura", "FFF5D3", "FCB200", 6),
];

/**
 * EXEMPLO 3: 4 TIPOS
 *   - type=1 => "Ataques"
 *   - type=2 => "Concentração de fumaça"
 *   - type=3 => "Temperatura"
 *   - type=4 => "Umidade"
 */
export const mockTasksFourTypes: Task[] = [
  ...createNonOverlappingTasks(1, "Ataques", "FFF0F0", "ED695E", 6),
  ...createNonOverlappingTasks(
    2,
    "Concentração de fumaça",
    "E1F4FF",
    "274488",
    6
  ),
  ...createNonOverlappingTasks(3, "Temperatura", "FFF5D3", "FCB200", 6),
  ...createNonOverlappingTasks(4, "Umidade", "FFECDA", "FF6700", 6),
];
