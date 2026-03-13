import AppLoader from './appLoader';

import type { NewsResponse, SourcesResponse } from '../view/appView';

type Callback<T> = (data: T) => void;

class AppController extends AppLoader {

    getSources(callback: Callback<SourcesResponse>): void {

        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );

    }

    getNews(e: Event, callback: Callback<NewsResponse>): void {

        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {

            if (target.classList.contains('source__item')) {

                const sourceId = target.getAttribute('data-source-id');

                if (newsContainer.getAttribute('data-source') !== sourceId) {

                    newsContainer.setAttribute('data-source', sourceId ?? '');

                    super.getResp<NewsResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId ?? '',
                            },
                        },
                        callback
                    );
                }

                return;
            }

            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;