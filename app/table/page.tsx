'use client';

import React, { useState, useEffect } from 'react';
import './styles.css';

interface Plan {
    id: number;
    name: string;
    duration: number;
    progress: number;
    isRunning: boolean;
}

const Home: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [planName, setPlanName] = useState('');
    const [planDuration, setPlanDuration] = useState<number>(0);
    const [nextPlanId, setNextPlanId] = useState(1);
    const [debts, setDebts] = useState<string[]>([]);

    const addPlan = () => {
        if (planName && planDuration > 0) {
            setPlans([
                ...plans,
                { id: nextPlanId, name: planName, duration: planDuration, progress: 0, isRunning: false }
            ]);
            setNextPlanId(nextPlanId + 1);
            setPlanName('');
            setPlanDuration(0);
        }
    };

    const deletePlan = (id: number) => {
        setPlans(plans.filter(plan => plan.id !== id));
    };

    const clearProgress = () => {
        setPlans(plans.map(plan => ({ ...plan, progress: 0, isRunning: false })));
    };

    const togglePlan = (id: number) => {
        setPlans(
            plans.map(plan =>
                plan.id === id ? { ...plan, isRunning: !plan.isRunning } : { ...plan, isRunning: false }
            )
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setPlans(plans =>
                plans.map(plan => {
                    if (plan.isRunning && plan.progress < plan.duration) {
                        return { ...plan, progress: plan.progress + 1 };
                    }
                    return plan;
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleAddDebt = (debt: string) => {
        if (debt) setDebts([...debts, debt]);
    };

    return (
        <div>
            <h1>计划管理器</h1>
            <div>
                <input
                    type="text"
                    value={planName}
                    onChange={e => setPlanName(e.target.value)}
                    placeholder="计划名称"
                />
                <input
                    type="number"
                    value={planDuration}
                    onChange={e => setPlanDuration(Number(e.target.value))}
                    placeholder="持续时间（秒）"
                />
                <button onClick={addPlan}>添加计划</button>
            </div>
            <div>
                {plans.map(plan => (
                    <div key={plan.id} className="plan-container">
                        <div className="plan-header">
                            <strong>{plan.name}</strong> - {plan.duration}秒
                            <div>
                                <button onClick={() => togglePlan(plan.id)}>
                                    {plan.isRunning ? '暂停' : '执行'}
                                </button>
                                <button onClick={() => deletePlan(plan.id)}>删除</button>
                            </div>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress"
                                style={{
                                    width: `${(plan.progress / plan.duration) * 100}%`
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={clearProgress}>清空所有进度</button>
            <h2>欠债列表</h2>
            <div className="debt-list">
                <DebtList debts={debts} onAddDebt={handleAddDebt} />
            </div>
        </div>
    );
};

const DebtList: React.FC<{ debts: string[]; onAddDebt: (debt: string) => void }> = ({
                                                                                        debts,
                                                                                        onAddDebt,
                                                                                    }) => {
    const [newDebt, setNewDebt] = useState('');

    const addDebt = () => {
        onAddDebt(newDebt);
        setNewDebt('');
    };

    return (
        <div>
            <input
                type="text"
                value={newDebt}
                onChange={e => setNewDebt(e.target.value)}
                placeholder="新的欠债"
            />
            <button onClick={addDebt}>添加欠债</button>
            <ul>
                {debts.map((debt, index) => (
                    <li key={index}>{debt}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
