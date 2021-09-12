import {
  RequestOptions as RequestComposeOptions,
} from 'request-compose'

// ----------------------------------------------------------------------------

/**
 * Chrome Web Store Item
 */
export interface Item {
  id: string
  name: string
  title: string
  slug: string
  url: string
  author: {
    name: string
    domain: string | null
    url: string | null
  }
  users: string
  rating: {
    average: number
    count: number
  }
  price: string | null
  category: {
    name: string
    slug: string
  }
  images: {
    '26x26': string | null
    '128x128': string | null
    '141x90': string | null
    '220x140': string | null
    '440x280': string | null
    '460x340': string | null
  }
  status: string | null
}

/**
 * Chrome Web Store Detail
 */
export interface Detail extends Item {
  description: string
  website: string
  support: string
  version: string
  size: string
  published: string
  purchases: null
  languages: string[]
  developer: {
    email: string | null
    address: string | null
    policy: string | null
  }
  type: string
  manifest: string
  related: Item[] | undefined
  more: Item[] | undefined
}

/**
 * Chrome Web Store Review
 */
export interface Review {
  rating: 5 | 4 | 3 | 2 | 1
  message: string
  created: number
  updated: number
  author: {
    id: string | undefined
    name: string | undefined
    avatar: string | null
  }
}

/**
 * Chrome Web Store Issue
 */
export interface Issue {
  type: string
  status: string
  title: string
  description: string
  browser: string
  version: string
  date: number
  author: {
    id: string | undefined
    name: string | undefined
    avatar: string | null
  }
}

// ----------------------------------------------------------------------------

/**
 * Detail options
 */
export interface DetailOptions extends RequestComposeOptions {
  /**
   * Item ID
   */
  id: string
  /**
   * Include a list of related extensions
   */
  related?: boolean
  /**
   * Include a list of more items from the same developer
   */
  more?: boolean
  /**
   * Set locale for the response data
   * @default en
   */
  locale?: string
  /**
   * Chrome Web Store API version
   */
  version?: string
}

/**
 * Item feature set
 */
export type Features = 'offline' | 'google' | 'free' | 'android' | 'gdrive'

/**
 * Items options
 */
export interface ItemsOptions extends RequestComposeOptions {
  /**
   * Filter items by search term
   */
  search?: string
  /**
   * Filter items by category name
   */
  category?: string
  /**
   * Filter items by number of stars
   */
  rating?: 5 | 4 | 3 | 2
  /**
   * Filter items by feature set
   */
  features?: Features[]
  /**
   * Number of items to return
   * @default 5
   */
  count?: number
  /**
   * Start returning items from `offset` (**requires** `category`)
   */
  offset?: number
  /**
   * Set locale for the response data
   * @default en
   */
  locale?: string
  /**
   * Chrome Web Store API version
   */
  version?: string
}

/**
 * Reviews options
 */
export interface ReviewsOptions extends RequestComposeOptions {
  /**
   * Item ID
   */
  id: string
  /**
   * Number of reviews to return
   * @default 5
   */
  count?: number
  /**
   * Start returning items from offset
   */
  offset?: number
  /**
   * Return reviews only in locale
   * @default all locales
   */
  locale?: string
  /**
   * Sort order
   * @default helpful
   */
  sort?: 'helpful' | 'recent'
  /**
   * Chrome Web Store API version
   */
  version?: string
}

/**
 * Issues options
 */
export interface IssuesOptions extends RequestComposeOptions {
  /**
   * Item ID
   */
  id: string
  /**
   * Filter by issue type
   * @default all
   */
  type?: 'problem' | 'question' | 'suggestion'
  /**
   * Number of issues to return
   * @default 5
   */
  count?: number
  /**
   * Start returning issues from page (page * count)
   */
  page?: number
  /**
   * Chrome Web Store API version
   */
  version?: string
}

// ----------------------------------------------------------------------------

/**
 * Google Chrome Web Store HTTP Client
 */
declare module 'chrome-webstore' {
  /**
   * Get full details about a Web Store item
   * @param options __`id`__ | `related` | `more` | `locale` | `version`
   */
  function detail(options: DetailOptions): Promise<Detail>
  /**
   * List Web Store items (subset of the detail data)
   * @param options `search` | `category` | `rating` | `features` | `count` | `offset` | `locale` | `version`
   */
  function items(options: ItemsOptions): Promise<Item[]>
  /**
   * List reviews for an item
   * @param options __`id`__ | `count` | `offset` | `locale` | `sort` | `version`
   */
  function reviews(options: ReviewsOptions): Promise<Review[]>
  /**
   * List issues for an item
   * @params __`id`__ | `type` | `count` | `page` | `version`
   */
  function issues(options: IssuesOptions): Promise<Issue[]>
  /**
   * Get Chrome Web Store API version
   */
  function version(options?: RequestComposeOptions): Promise<string>
}
