export interface TrafficQuiz {
    questions: TrafficQuestion[];
}

export interface TrafficQuestion {
    question: string;
    responses: string[];
    correction: number[];
}