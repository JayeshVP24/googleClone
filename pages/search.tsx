import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Header from "../components/Header";
import Response from "../Response";
import SearchResults from '../components/SearchResults'

interface ISearch {
    results: object;
}

const Search: React.FC<ISearch> = ({ results }) => {
    const router = useRouter();

    console.log(results);
    return (
        <div>
            <Head>
                <title>{router.query.term} - Google Search</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            {/* Search Results */}
            <SearchResults results={results} />
        </div>
    );
};

export default Search;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // const useDummyData = process.env.USE_DUMMY === "0" ? false : true;
    const useDummyData = false;
    console.log(useDummyData);
    const startIndex = context.query.start || "0";

    console.log("api", process.env.API_KEY);
    const data = useDummyData
        ? Response
        : await fetch(
              `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
          ).then((res) => res.json());
        

    return {
        props: {
            results: data,
        },
    };
}
