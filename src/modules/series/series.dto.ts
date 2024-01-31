export interface TrafficQuiz {
    questions: TrafficQuestion[];
    audio: string;
    image: string;
    justification: string;
}

export interface TrafficQuestion {
    question: string;
    responses: string[];
    correction: number[];
}