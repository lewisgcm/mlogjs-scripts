const UNIT_TYPE = Units.poly;
const UNIT_CAPACITY = 30;

function waitForUnit() {
    const flag = getVar<symbol>("@flag");
    const unit = getVar<BasicUnit>("@unit");

    while (true) {
        unitBind(Units.poly);
        const isAlreadyBound = sensor(flag, unit);
        if (isAlreadyBound !== 1) {
            unitControl.flag(1);
            break;
        }
    }
}

function freeFlare() {
    unitControl.flag(0);
    unitControl.unbind();
}

function moveToPosition(x: number, y: number) {
    while (true) {
        const isWithin = unitControl.within({
            x,
            y,
            radius: 5,
        });
        if (isWithin) {
            break;
        }

        unitControl.move(x, y);
        wait(1);
    }
}

const container = getBuilding("container1");
if (container.phaseFabric < 10) {
    waitForUnit();

    // Drop any items if carying stuff
    unitControl.itemDrop(Blocks.air, 99);

    // Find our core
    const [, , , core] = unitLocate.building({
        group: "core",
        enemy: false,
    });

    moveToPosition(core.x, core.y);
    wait(2);
    unitControl.itemTake(core, Items.phaseFabric, UNIT_CAPACITY);
    wait(2);

    moveToPosition(container.x, container.y);
    wait(2);
    unitControl.itemDrop(container, UNIT_CAPACITY);
    wait(2);

    freeFlare();
}

if (container.silicon < 10) {
    waitForUnit();

    // Drop any items if carying stuff
    unitControl.itemDrop(Blocks.air, 99);

    // Find our core
    const [, , , core] = unitLocate.building({
        group: "core",
        enemy: false,
    });

    moveToPosition(core.x, core.y);
    wait(2);
    unitControl.itemTake(core, Items.silicon, UNIT_CAPACITY);
    wait(2);

    moveToPosition(container.x, container.y);
    wait(2);
    unitControl.itemDrop(container, UNIT_CAPACITY);
    wait(2);

    freeFlare();
}