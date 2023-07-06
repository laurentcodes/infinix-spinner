import ReactPaginate from 'react-paginate';

const Paginate = ({ pageCount, handlePageClick }) => {
	return (
		<ReactPaginate
			breakLabel='...'
			nextLabel='>'
			onPageChange={handlePageClick}
			pageRangeDisplayed={3}
			pageCount={pageCount}
			previousLabel='<'
			renderOnZeroPageCount={null}
			className='flex gap-1'
			pageClassName='bg-sky-400 p-1 w-8 text-center text-white'
			activeClassName='bg-sky-600'
			previousClassName='p-1 w-8 bg-sky-400 text-white text-center'
			nextClassName='p-1 w-8 bg-sky-400 text-white text-center'
		/>
	);
};

export default Paginate;
