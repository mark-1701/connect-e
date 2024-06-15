import Product from './classes/Product';

const d: Document = document;
d.addEventListener('DOMContentLoaded', (e: Event) => {
  const productData: Product[] = JSON.parse(localStorage.getItem('productData') || '[]');
  const $products = d.querySelector('#products') as HTMLElement;
  productData.some((product: Product, index: number) => {
    $products.innerHTML += `
    <div class="target">
      <div class="target-image">
        <img src="${product.uriImage}" alt="imagen" />
      </div>
      <div class="target-footer">
        <p class="subtitle">${product.name}</p>
      </div>
    </div>
  `;
    return index === 3;
  });
  const images: NodeListOf<HTMLImageElement> = $products.querySelectorAll('img');
  images.forEach((img: HTMLImageElement) => {
    img.addEventListener('error', (e: Event) => {
      const target = e.target as HTMLImageElement;
      target.src = './assets/img/image_not_found.jpg';
    });
  });
});
