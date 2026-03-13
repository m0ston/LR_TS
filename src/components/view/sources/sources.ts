import './sources.css';

interface SourceItem {
    id: string;
    name: string;
}

class Sources {

    draw(data: SourceItem[]): void {

        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {

            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const name = sourceClone.querySelector('.source__item-name') as HTMLElement;
            name.textContent = item.name;

            const element = sourceClone.querySelector('.source__item') as HTMLElement;
            element.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;