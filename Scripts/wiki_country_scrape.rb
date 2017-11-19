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
country_link = Hash.new
File.open("countries.json","w") do |f|
  for i in link_name
    t1 = i.text.strip
    if t1.include?","
      t2 = t1.split(",")[1] + " " + t1.split(",")[0]
    else
      t2 = t1
    end
    country_link["name"] = t2.strip
    country_link["wiki_link"] = root_url + i["href"].to_s
    node1 = Nokogiri::HTML(open(country_link["wiki_link"]))
    div_body = node1.css('div#bodyContent')
    para = div_body[0].css('p')
    flag = 0
    for j in para
      if flag == 0
        k = j.text
        t1 = k.split[0]
        if t1 == "The"
          t1 = k.split[1]
        end
        t2 = country_link["name"].split[0]
        if t2 == "The"
          t2 = country_link["name"].split[1]
        end
        if t1.eql? t2
          country_link["description"] = k
          flag = 1
        end
      end
    end
    f.write(JSON.pretty_generate(country_link))
  end
end
