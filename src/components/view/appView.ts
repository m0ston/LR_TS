import News from './news/news';
import Sources from './sources/sources';

interface NewsSource {
    name: string;
}

interface NewsItem {
    author: string | null;
    urlToImage: string | null;
    source: NewsSource;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}

interface SourceItem {
    id: string;
    name: string;
}

export interface NewsResponse {
    articles: NewsItem[];
}

export interface SourcesResponse {
    sources: SourceItem[];
}

class AppView {

    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse): void {
        const values = data.articles;
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse): void {
        const values = data.sources;
        this.sources.draw(values);
    }
}

export default AppView;