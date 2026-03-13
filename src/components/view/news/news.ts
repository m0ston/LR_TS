import './news.css';

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

class News {

   draw(data: NewsItem[]): void {
    const news = data.length >= 10 ? data.filter((_, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp');
    if (!(newsItemTemp instanceof HTMLTemplateElement)) {
        throw new Error('Template element not found');
    }

    news.forEach((item, idx) => {
        const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

        if (idx % 2) {
            newsClone.querySelector('.news__item')?.classList.add('alt');
        }

        // Фото
        const photo = newsClone.querySelector('.news__meta-photo') as HTMLElement;
        photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

        // Автор
        const author = newsClone.querySelector('.news__meta-author') as HTMLElement;
        author.textContent = item.author || item.source.name;

        // Дата
        const date = newsClone.querySelector('.news__meta-date') as HTMLElement;
        date.textContent = new Date(item.publishedAt).toLocaleDateString();

        // Заголовок (в шаблоне класс .news__description-title)
        const title = newsClone.querySelector('.news__description-title') as HTMLElement;
        title.textContent = item.title;

        // Описание (в шаблоне класс .news__description-content)
        const description = newsClone.querySelector('.news__description-content') as HTMLElement;
        description.textContent = item.description;

        // Источник (добавляем, если есть элемент)
        const source = newsClone.querySelector('.news__description-source') as HTMLElement;
        if (source) {
            source.textContent = item.source.name;
        }

        // Ссылка
        const link = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
        link.href = item.url;

        fragment.append(newsClone);
    });

    const newsContainer = document.querySelector('.news');
    if (newsContainer) {
        newsContainer.appendChild(fragment);
    }
}
}

export default News;