
import type LessonByLevelType from "../types/lessonByLevelType";

const mapLesson = (data: LessonByLevelType)=> {
    return {
        id: data.id,
        lessonName: data.lessonName,
        topic: data.topic,
        level: data.level,
        image: data.image,

        rating: Number(data.rating),

        summary: {
            hiragana: data.description,
            romaji: data.description,
        },
    };
};
export default mapLesson;