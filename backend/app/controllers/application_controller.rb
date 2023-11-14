class ApplicationController < ActionController::API
  # SetUserByTokenって拡張機能を使えるようにする
  # すべての controller で使える
  include DeviseTokenAuth::Concerns::SetUserByToken
end

# メソッドなどの詰め合わせ
# 詰め合わせてるだけで、実行はされない
module Hoge
  # 何かをするもの
  def sugiken
    puts 'sugiken'
  end
end

class BackTech
  include Hoge

  def say
    sugiken
  end
end

b = BackTech()
b.say