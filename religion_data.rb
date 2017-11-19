require 'csv'
require 'json'
class Hash
  def delete_value()
    delete_if { |k,v| v == 0 }
  end
end

data = CSV.read("WRP_national.csv", { encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all})
hashed_data = data.map { |d| d.to_hash }
for i in hashed_data
  i.delete_value
end
File.open("religion.json","w") do |f|
  f.write(JSON.pretty_generate(hashed_data))
end
