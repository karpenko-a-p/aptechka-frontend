/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare type Nullable<TType> = TType | null;

declare type Undefinable<TType> = TType | undefined;

declare type Nilable<TType> = TType | null | undefined;

declare type Children<TType = React.ReactNode> = Readonly<{ children: TType }>;

declare type RouteSegment<TName extends string> = { params: Promise<Record<TName, string>> };

declare type RouteArraySegment<TName extends string> = { params: Promise<Record<TName, string[] | undefined>> };

declare type PagePart<TName extends string> = Record<TName, React.ReactNode>;

declare type SearchParams<TName extends string = string> = { searchParams: Promise<Record<TName, string>> };
