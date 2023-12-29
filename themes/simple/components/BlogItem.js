import Link from 'next/link'
import CONFIG from '../config'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { formatDateFmt } from '@/lib/formatDate'
import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'

export const BlogItem = props => {
  const { post } = props
  const showPageCover = siteConfig('SIMPLE_POST_COVER_ENABLE', false, CONFIG)

  return <div key={post.id} className="h-42 my-6 pb-12 border-b dark:border-gray-800" >
        {/* 文章标题 */}

        <div className='flex'>
            <div className='article-cover h-full'>
                {/* 图片封面 */}
                {showPageCover && (
                    <div className="overflow-hidden mr-2 w-56 h-full">
                        <Link href={`${siteConfig('SUB_PATH', '')}/${post.slug}`} passHref legacyBehavior>
                            <LazyImage src={post?.pageCoverThumbnail} className='w-56 h-full object-cover object-center group-hover:scale-110 duration-500' />
                        </Link>
                    </div>
                )}
            </div>

            <div className='article-info'>
                <h2 className="mb-2">
                    <Link
                        href={`${siteConfig('SUB_PATH', '')}/${post.slug}`}
                        className="blog-item-title font-bold text-black text-2xl menu-link">
                        {post.title}
                    </Link>
                </h2>

                {/* 文章信息 */}

                <div className="mb-5 text-md text-gray-700 dark:text-gray-300 flex-wrap flex leading-6">
                    <div className='space-x-2'>
                        <span>  <a href={siteConfig('SIMPLE_AUTHOR_LINK', null, CONFIG)} className='p-1 hover:text-red-400 transition-all duration-200'><i className="fa-regular fa-user"></i> {siteConfig('AUTHOR')}</a></span>
                        <span>
                            <Link className='p-1 hover:text-red-400 transition-all duration-200' href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}>
                                <i className="fa-regular fa-clock" /> {post.date?.start_date || post.createdTime}
                            </Link>
                        </span>
                        <span><TwikooCommentCount post={post} /></span>
                    </div>

                    <div>
                        {post.category && <Link href={`/category/${post.category}`} className='p-1'> <span className="hover:text-red-400 transition-all duration-200"><i className="fa-regular fa-folder mr-0.5" />{post.category}</span></Link>}
                        {post?.tags && post?.tags?.length > 0 && post?.tags.map(t => <Link key={t} href={`/tag/${t}`} className=' hover:text-red-400 transition-all duration-200'><span > /{t}</span></Link>)}
                    </div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 leading-normal mb-6">
                    {post.summary}
                    {post.summary && <span>...</span>}
                </div>
            </div>
        </div>

        <div className='block'>
            <Link href={`${siteConfig('SUB_PATH', '')}/${post.slug}`} className='inline-block rounded-sm text-blue-600 text-xs dark:border-gray-800 border hover:text-red-400 transition-all duration-200 hover:border-red-300 h-9 leading-8 px-5'>
                Continue Reading <i className="fa-solid fa-angle-right align-middle"></i>
            </Link>
        </div>
    </div>
}