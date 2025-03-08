import axios from "axios"

interface SearxngSeearchOptions{
    categories?: string[],
    engines?: string[],
    pageno?:number,
    language?:string
}

interface SearcxngSearchResult{
    title:string,
    url:string,
    img_src?:string,
    thumbnail_src?:string,
    content?:string,
    author?:string
}

export const searchSearxng = async(
    query:string,
    options?: SearxngSeearchOptions
) => {

    const baseurl = new URL(`${process.env.SEARXNG_API_URL}/search?format=json`);
    baseurl.searchParams.append("q",query);

    // as oprions are optional so if options are there then we will ad the options in the searchparams too
    if(options){
        Object.keys(options).forEach((key) => {
            if(Array.isArray(options[key])){
                baseurl.searchParams.append(key,options[key].join(","));
                return;
            }else{
                baseurl.searchParams.append(key,options[key]);
            }
        })
    }

    //now we will make a get request by converting the url object to string by tostring()
    const res = await axios.get(baseurl.toString());

    const results: SearcxngSearchResult[] = res.data.results;
    const suggestions: string[] = res.data.suggestions;

    return {results,suggestions};

}