export class CreateQuestionDto {
    description?: string;
    answer?: string;
    fourAnswers?: string[]; // Mảng 4 đáp án (JSONB)
}

