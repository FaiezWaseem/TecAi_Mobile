import Cache from "../Cache";
import fetcher from "../fetcher";
import log from "../log";

const fetchContent = async (id : string | number) => {
    const unique_key = `course_content_${id}`;
    const isExist = await Cache.getSessionValue(unique_key, Cache.JSON) || null;
    if (isExist) {
        log('Course Content Loading From Cache')
        return isExist
    }
    const { data } = await fetcher.get(`/course/content/${id}`)
    const transformedResponse = data?.data.reduce((acc : any, item : any) => {
        const existingChapter = acc.find((chapter : any) => chapter.chapterName === item.chapter_title);
        if (existingChapter) {
            existingChapter.content.push({
                content_type: item.content_type,
                content_link: item.content_link,
                topic_title: item.topic_title,
            });
        } else {
            acc.push({
                chapterName: item.chapter_title,
                content: [{
                    content_type: item.content_type,
                    content_link: item.content_link,
                    topic_title: item.topic_title,
                }]
            });
        }
        return acc;
    }, []);

    Cache.setSessionValue(unique_key, transformedResponse, Cache.JSON)
    return transformedResponse
}


export { fetchContent }