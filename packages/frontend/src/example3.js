// 抽象工厂
class MobilePhoneFactory{
  createOS(){
    throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！')
  }
  createHardWare(){
    throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！')
  }
}

// 生产FakeStar手机工厂
class FakeStarFactory extends MobilePhoneFactory{
  createOS(){
    return new AndroidOS()
  }
  createHardWare(){
    return new QualcommHardWare()
  }
}

// 抽象产品类
class OS{
  controlHardWare(){
    throw new Error('抽象产品方法不允许直接调用，你需要将我重写！')
  }
}

class AndroidOS extends OS{
  controlHardWare(){
    console.log('我会用安卓的方式去操作硬件');
  }
}

class AppleOS extends OS{
  controlHardWare(){
    console.log('我会用🍎的方式去操作硬件');
  }
}

// 抽象产品类
class HardWare{
  operateByOrder(){
    throw new Error('抽象产品方法不允许直接调用，你需要将我重写！')
  }
}

class QualcommHardWare extends HardWare{
  operateByOrder(){
    console.log('我会用高通的方式去运转');
  }
}

class MiWare extends HardWare{
  operateByOrder(){
    console.log('我会用小米的方式去运转');
  }
}

// 生产一台手机

const myPhone = new FakeStarFactory()
// 让它拥有操作系统
const myOS = myPhone.createOS()
// 让它拥有硬件
const myHardWare = myPhone.createHardWare()
// 唤醒操作系统
myOS.controlHardWare()
// 唤醒硬件
myHardWare.operateByOrder()