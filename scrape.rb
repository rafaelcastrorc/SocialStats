require 'nokogiri'
require 'open-uri'
require 'json'

root_url = "https://en.wikipedia.org"
follow = "/wiki/List_of_sovereign_states"
node = Nokogiri::HTML(open(root_url + follow))
table = node.css('table.wikitable')
wiki_link = table[0].css('tr > td > a').map { |link| link['href']}
title = table[0].css('tr > td > a').map { |link| link['title']}
links = table[0].css('tr')
link_name = []
for i in 0..links.length
  if links[i]
    temp = links[i].css('td')
    temp1 = temp.css('a')[0]
    if temp1
      if /wiki/.match(temp1.to_s)
        link_name.push(temp1)
      end
    end
  end
end
link_name = link_name.drop(1)
country = Hash.new
for i in link_name
  country[i.text.strip] = root_url + i["href"].to_s
end
puts country.length
File.open("temp.json","w") do |f|
  f.write(JSON.pretty_generate(country))
end
