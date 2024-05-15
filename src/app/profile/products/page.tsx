import CreateCompanyForm from "./_components/create-company";

const ProductsCompany = () => {
  return (
    <div className=" flex justify-between items-center  pt-20 border-b border-zinc-500 pb-4">
      <h1 className="font-semibold text-xl">Meu Produtos</h1>
      <CreateCompanyForm />
    </div>
  );
};

export default ProductsCompany;
