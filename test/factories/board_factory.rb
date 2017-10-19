FactoryGirl.define do
  factory :board do
    title { FFaker::Lorem.unique.words.join(" ") }
  end

  factory :list do
    title { FFaker::Lorem.unique.words.join(" ") }
    position { rand(100).to_f }
  end

  factory :card do
    title { FFaker::Lorem.unique.words.join(" ") }
    position { rand(100).to_f }
  end
end
