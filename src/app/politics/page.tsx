import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Аптечка | Политика конфиденциальности',
};

/**
 * Политика конфиденциальности
 */
export default function Page() {
  return (
    <div className="container">
      <h1 className="my-4">Политика конфиденциальности</h1>

      <Link href="/" className="mb-4">
        На главную
      </Link>

      <div className="flex flex-col gap-2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur blanditiis deleniti deserunt
          dolorem et expedita facere harum inventore iusto laborum libero molestiae neque obcaecati omnis pariatur
          provident quidem quisquam repellat repudiandae sequi, similique sit vel voluptate voluptatem? Aliquid, animi,
          beatae corporis hic, inventore iure laudantium minima nobis quaerat quos sapiente tempore vitae. A ad, autem
          deleniti ea eaque et facere harum impedit laudantium magnam maxime possimus, quasi quibusdam sed similique,
          voluptate voluptatibus! Accusantium adipisci consequuntur cum expedita id illo impedit nihil nisi quasi, sequi
          sit voluptas. Ab ad alias aliquam aliquid amet animi, atque enim facere ipsa itaque iure laudantium maxime
          minus nam neque nisi nulla numquam reprehenderit rerum unde.
        </p>
        <p>
          Ab exercitationem libero maiores nam nihil porro quas, qui vitae voluptates voluptatibus! Atque blanditiis
          commodi consequuntur cupiditate distinctio eum laborum, magnam maxime natus nostrum quidem, rem vel, voluptas
          voluptate voluptatibus! Architecto blanditiis consequatur distinctio dolores ex harum hic illo in labore
          maiores nam natus necessitatibus nihil, placeat quibusdam saepe sequi sunt ullam. Animi aperiam at beatae eum
          facilis iusto, modi possimus quibusdam quidem voluptates! Aperiam consequatur deserunt dicta ducimus
          exercitationem fugiat ipsam ipsum laudantium magnam nesciunt nisi nulla obcaecati officiis optio quibusdam
          quis recusandae repellendus repudiandae rerum, sequi similique!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur blanditiis deleniti deserunt
          dolorem et expedita facere harum inventore iusto laborum libero molestiae neque obcaecati omnis pariatur
          provident quidem quisquam repellat repudiandae sequi, similique sit vel voluptate voluptatem? Aliquid, animi,
          beatae corporis hic, inventore iure laudantium minima nobis quaerat quos sapiente tempore vitae. A ad, autem
          deleniti ea eaque et facere harum impedit laudantium magnam maxime possimus, quasi quibusdam sed similique,
          voluptate voluptatibus! Accusantium adipisci consequuntur cum expedita id illo impedit nihil nisi quasi, sequi
          sit voluptas. Ab ad alias aliquam aliquid amet animi, atque enim facere ipsa itaque iure laudantium maxime
          minus nam neque nisi nulla numquam reprehenderit rerum unde. Ab exercitationem libero maiores nam nihil porro
          quas, qui vitae voluptates voluptatibus!
        </p>
        <p>
          Ab exercitationem libero maiores nam nihil porro quas, qui vitae voluptates voluptatibus! Atque blanditiis
          commodi consequuntur cupiditate distinctio eum laborum, magnam maxime natus nostrum quidem, rem vel, voluptas
          voluptate voluptatibus! Architecto blanditiis consequatur distinctio dolores ex harum hic illo in labore
          maiores nam natus necessitatibus nihil, placeat quibusdam saepe sequi sunt ullam. Animi aperiam at beatae eum
          facilis iusto, modi possimus quibusdam quidem voluptates! Aperiam consequatur deserunt dicta ducimus
          exercitationem fugiat ipsam ipsum laudantium magnam nesciunt nisi nulla obcaecati officiis optio quibusdam
          quis recusandae repellendus repudiandae rerum, sequi similique!
        </p>
      </div>
    </div>
  );
}
