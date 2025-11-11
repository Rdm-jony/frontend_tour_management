
const SectionTitle = ({ title, subTitle }: { title: string, subTitle: string }) => {
    return (
        <div className="md:w-2/3 mx-auto text-center mb-10">
            <h2 className="text-4xl font-semibold mb-5">{title}</h2>
            <p className="text-center">{subTitle}</p>
        </div>
    );
};

export default SectionTitle;